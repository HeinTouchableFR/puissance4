import Fastify from 'fastify'
import FastifyStatic from '@fastify/static'
import FastifyWebsocket from '@fastify/websocket'
import {v4} from 'uuid'
import {sign, verify} from "./functions/crypto";
import {resolve} from 'path';
import {ServerErrors} from "../../src/types";
import {ConnectionRepository} from "../../src/server/repositories/ConnectionRepository";
import {GameRepository} from "../../src/server/repositories/GameRepository";
import {GameModel} from "../../src/machine/GameMachine";
import {publishMachine} from "../../src/server/functions/socket";


const connections = new ConnectionRepository()
const games = new GameRepository(connections)

const fastify = Fastify({logger: true})
fastify.register(FastifyStatic, {
    root: resolve('./public')
})
fastify.register(FastifyWebsocket)

fastify.register(async (f) => {
    f.get('/ws', {websocket: true}, (connection, req) => {
        const query = req.query as Record<string, string>
        const playerId = query.id ?? ''
        const signature = query.signature ?? ''
        const playerName = query.name || 'John Doe'
        const gameId = query.gameId

        if (!gameId) {
            connection.end()
            f.log.error('Pas de gameId')
            return
        }

        if (!verify(playerId, signature)) {
            f.log.error('Erreur d\'authentification')
            connection.socket.send(JSON.stringify({
                type: 'error',
                code: ServerErrors.AuthError
            }))
            return
        }

        const game = games.find(gameId) ?? games.create(gameId)
        connections.persist(playerId, gameId, connection)
        game.send(GameModel.events.join(playerId, playerName))

        publishMachine(game.state, connection)

        connection.socket.on('message', (rawMessage) => {
            const message = JSON.parse(rawMessage.toLocaleString())
            if (message.type === 'gameUpdate') {
                game.send(message.event)
            }
        })

        connection.socket.on('close', () => {
            connections.remove(playerId, gameId)
            game.send(GameModel.events.leave(playerId))
            games.clean(gameId)
        })
    })
})

fastify.post('/api/players', (_, res) => {
    const playerId = v4()
    res.send({
        id: playerId,
        signature: sign(playerId)
    })
})

fastify.listen({port: 8000}).catch((err) => {
    fastify.log.error(err)
    process.exit(1)
}).then(() => {
    fastify.log.info('Le serveur écoute sur le port 8000')
})