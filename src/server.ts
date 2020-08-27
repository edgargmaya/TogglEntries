/* Express Framework imports */
import express, { Application } from 'express'
import morgan from 'morgan'

/* Routes */
import IssuesRoutes from './routes/issues.routes'

/* Server Class */
export class Server {

    private server: Application;

    constructor( private port: number ) {
        this.server = express();
        this.server.set('port', this.port);
        this.routes();
        this.middlewares();
    }

    private middlewares() {
        this.server.use(morgan('dev'));
        this.server.use(express.json());
    }

    private routes() {
        this.server.use('/stackit-challenge/api', IssuesRoutes);
    }

    async listen(): Promise<void> {
        await this.server.listen(this.server.get('port'));
        console.log('Server Working');
    }

}