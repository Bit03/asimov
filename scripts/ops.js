// Commands:
//    hubot deploy <project name> - 通过 Ansible 部署项目 <project name>
//
// Author:
//  jiaxin 

const yargs = require("yargs");
const spawn = require("child_process").spawn;


module.exports = function(robot){
    robot.respond(/update ansible/i, function(msg) {
        msg.send("ok");
    });
    robot.respond(/deploy (.*)/i, function(msg) {
        let parser = yargs.command("deploy [project]", 'deploy a project', function(yargs){
            yargs.positional('project', {
                type: "string",
                default: 'quark',
                describe: 'project name',
            }).option("debug", {
                alias: 'd',
                describe: 'enable debug output',
                type: 'boolean',
                default: false,
            })
        }, function(argv){
            const projectName = argv.project;
            msg.send(`:alarm_clock: Deploying #${projectName} :coffee:`);
            const process = spawn(`/root/.virtualenvs/ansible/bin/ansible-playbook -i hosts ${projectName}.yml`, [], {
                cwd: "/opt/ansible",
                shell: true,
            });
            process.stdout.on('data', function(data){
                if (argv.debug) {
                    msg.send(`${data}`);
                }
            });
            process.stderr.on('data', function(data){
                msg.send(`${data}`);
            });
            process.on('close', function(code){
                if (code !== 0) {
                    msg.send('(boom) Deployment failed');
                  } else {
                    msg.send(`:heavy_check_mark: Deployment completed.`);
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