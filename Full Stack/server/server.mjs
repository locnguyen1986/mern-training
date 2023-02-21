import express from 'express';
import http from 'http'; //500 (gzipped:314)
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { resolve } from 'path';
import cors from 'cors';

const app = express();
const httpServer = http.createServer(app);

const typeDefs = ` #graphql

    type Query{
        name: String
    }

   
`;
const resolvers = {
    Query:{
        name :() => {return 'HoleTex'}
    }
};


//schema
//resolver
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[
        
        ApolloServerPluginDrainHttpServer({ httpServer }), // Proper shutdown for the WebSocket server.
    
    ]
})

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server) );
await new Promise((resolve) => httpServer.listen({port: 4000}, resolve));
console.log('Server is ready at http://localhost:4000');

