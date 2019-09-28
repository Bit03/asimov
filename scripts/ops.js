const yargs = require("yargs");
const spawn = require("child_process").spawn;


module.exports = function(robot){
    robot.respond(/deploy (.*)/i, function(msg) {
        let parser = yargs.command("deploy [project]", 'deploy a project', function(yargs){
            yargs.positional('project', {
                type: "string",
                default: 'quark',
                describe: 'project name',
            })
        }, function(argv){
            const projectName = argv.project;
            msg.send(`(waiting) Deploying #${projectName} (tea)`);
            const process = spawn(`/root/.virtualenvs/ansible/bin/ansible-playbook -i hosts ${projectName}.yml`, [], {
                cwd: "/opt/ansible",
                shell: true,
            });
            process.stdout.on('data', function(data){
                msg.send(`${data}`);
            });
            process.stderr.on('data', function(data){
                msg.send(`${data}`);
            });
            process.on('close', function(code){
                if (code !== 0) {
                    msg.send('(boom) Deployment failed');
                  } else {
                    msg.send(`(successful) Deployment completed. You can access it using https://www.block123.com`);
                  }
            });
        }).help();

        parser.parse(`deploy ${msg.match[1]}`, (err, argv, output) => {
            if (output) {
                msg.reply(output)
            }
        });

    }) 
}