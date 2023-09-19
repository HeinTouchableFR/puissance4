import Fastify from 'fastify'
import FastifyStatic from '@fastify/static'
import {v4} from 'uuid'
import {sign} from "./functions/crypto";
import {resolve} from 'path';

const fastify = Fastify({logger: true})
fastify.register(FastifyStatic, {
    root: resolve('./public')
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