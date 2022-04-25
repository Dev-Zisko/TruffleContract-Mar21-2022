const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
    before(async () => {
        this.tasksContract = await TasksContract.deployed();
    });

    it('Migrate deployed successfully.', async () => {
        const address = await this.tasksContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('Get first task successfully.', async () => {
        const tasksCounter = await this.tasksContract.taskCounter();
        const task = await this.tasksContract.tasks(tasksCounter);

        assert.equal(task.id.toNumber(), tasksCounter);
        assert.equal(task.title, "First Task");
        assert.equal(task.description, "I have to do something.");
        assert.equal(task.done, false);
        assert.equal(tasksCounter, 1);
    });

    it('Task created successfully.', async () => {
        const result = await this.tasksContract.createTask("Some Task", "I have to do something.");
        const taskEvent = result.logs[0].args;
        const tasksCounter = await this.tasksContract.taskCounter();

        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "Some Task");
        assert.equal(taskEvent.description, "I have to do something.");
        assert.equal(task.done, false);
        assert.equal(tasksCounter, 2);
    });

    it('Task toggle done successfully.', async () => {
        const result = await this.tasksContract.toggleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.tasksContract.tasks(1);

        assert.equal(task.done, true);
        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);
    });
});