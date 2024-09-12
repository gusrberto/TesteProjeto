import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { FastifyCorsOptions } from '@fastify/cors';

// Instância do WhatsApp Web JS
import './bot-wp/sendMessage'

// Rotas
import procedureRoutes from "./routes/procedure.route";
import workScheduleRoutes from "./routes/workSchedule.route";
import exceptScheduleRoutes from "./routes/exceptSchedule.route";
import appointmentRoutes from "./routes/appointment.route";
import reviewRoutes from "./routes/review.route";
import authRoutes from "./routes/auth.route";

// Cron Job
import { startCronJobs } from "./cronJobs";

const fastify = Fastify({ logger: true });

// CORS
fastify.register(fastifyCors, {
    origin: (origin: string | undefined, cb: (err: Error | null, allow: boolean) => void) => {
        const allowedOrigins = ['https://browstyle.netlify.app', 'https://browstyle.onrender.com', 'http://localhost:8080'];
        
        if (!origin || allowedOrigins.includes(origin)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
} as FastifyCorsOptions);

const start = async () => {
    try {
        // Registrar rotas
        fastify.register(procedureRoutes, { prefix: '/procedimento' });
        fastify.register(workScheduleRoutes, { prefix: '/grade' });
        fastify.register(exceptScheduleRoutes, { prefix: '/excecao' });
        fastify.register(appointmentRoutes, { prefix: '/agendamento' });
        fastify.register(reviewRoutes, { prefix: '/avaliacao' });
        fastify.register(authRoutes, { prefix: '/auth' });

        // Iniciar o servidor
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log(`Server online at http://localhost:3000`);

        // Iniciar CronJob
        startCronJobs();
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();