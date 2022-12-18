/* eslint-disable global-require */
const inquirer = require('inquirer');

class StartCommand {
  questions = [
    {
      name: 'serviceName',
      type: 'list',
      message: 'Select service to start',
      choices: [{ name: 'Server', value: 'server' }],
    },
  ];

  requestApp() {
    return inquirer.prompt(this.questions);
  }

  run(name: string) {
    switch (name) {
      case 'server':
        require('@app/server');
        break;
      default:
        this.requestApp().then(({ serviceName }: { serviceName: string }) => {
          this.run(serviceName);
        });
    }
  }
}

export default new StartCommand();
