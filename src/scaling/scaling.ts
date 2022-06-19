import os from 'os';
import cluster from 'cluster';

const runCluster = async () => {
    if (cluster.isPrimary) {
        const countCpu = os.cpus().length;
        process.stdout.write(`Has been started ${countCpu} workers\n`);

        for (let i = 0; i < countCpu; i += 1) {
            cluster.fork();
        }
    } else {
        await import('../index');
        process.stdout.write(`Worker ${cluster.worker?.id} with id ${process.pid} is running\n`);
    }
};

runCluster();
