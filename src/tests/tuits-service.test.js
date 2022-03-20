import {
    findAllTuits, findTuitById,
    findTuitByUser, createTuit,
    updateTuit, deleteTuit
} from "../services/tuits-service";
import {createUser, deleteUsersByUsername, findUserByUsername} from "../services/users-service";

const sampleTuit = {
    tuit: 'Test Tuit 1',
};

const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

describe('can create tuit with REST API', () => {
    let tid;

    beforeAll(async () => {
        let promises = [];
        await deleteUsersByUsername(ripley.username);
        promises.push(createUser(ripley));
        return Promise.all(promises);
    });

    afterAll(() => {
        let promises = [];
        promises.push(deleteTuit(tid));
        promises.push(deleteUsersByUsername(ripley.username));
        return Promise.all(promises);
    });

    test('can create a tuit', async () => {
        const user = await findUserByUsername(ripley.username);

        const newTuit = await createTuit(user.username, sampleTuit);
        tid = newTuit._id;

        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(user.username);
    });
});

describe('can delete tuit wtih REST API', () => {
    let tid;

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        const newUser = await createUser(ripley);

        const newTuit = await createTuit(newUser.username, sampleTuit);
        tid = newTuit._id;
        return tid;
    });

    afterAll(() => {
        let promises = [];
        promises.push(deleteTuit(tid));
        promises.push(deleteUsersByUsername(ripley.username));
        return Promise.all(promises);
    });

    test('delete tuit by PK', async () => {
        const status = await deleteTuit(tid);

        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    let tid;

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        const newUser = await createUser(ripley);

        const newTuit = await createTuit(newUser.username, sampleTuit);
        tid = newTuit._id;
        return tid;
    });

    afterAll(() => {
        let promises = [];
        promises.push(deleteTuit(tid));
        promises.push(deleteUsersByUsername(ripley.username));
        return Promise.all(promises);
    });

    test('retrieve Tuit by PK', async () => {
        const user = await findUserByUsername(ripley.username);
        const tuit = await findTuitById(tid);
        expect(tuit.tuit).toEqual(sampleTuit.tuit);
        expect(tuit.postedBy).toEqual(user.username);
    })
});

describe('can retrieve all tuits with REST API', () => {
    let tids = [];
    let tuits = [];

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        const newUser = await createUser(ripley);

        for (let tuitCount = 0; tuitCount < 5; tuitCount++) {
            const tuit = `Test Tuit ${tuitCount + 1}`;
            sampleTuit.tuit = tuit;

            let newTuit = await createTuit(newUser.username, sampleTuit);

            tids.push(newTuit._id);
            tuits.push(tuit);
        }

        return tids;
    });

    afterAll(() => {
        let promises = [];

        tids.forEach((tid) => {
            promises.push(deleteTuit(tid));
        });
        promises.push(deleteUsersByUsername(ripley.username));

        return Promise.all(promises);
    });

    test('Retrieve all Tuits', async () => {
        const allTuits = await findAllTuits();
        const user = await findUserByUsername(ripley.username);

        const createdTuits = allTuits.filter(
            (tuit) => tids.indexOf(tuit._id) >= 0);

        expect(allTuits.length).toBeGreaterThanOrEqual(tids.length);

        createdTuits.forEach((tuit) => {
            const tid = tids.find((tid) => tid === tuit._id);
            expect(tuit.tuit).toEqual(tuits[(tids.indexOf(tid))]);
            expect(tuit.postedBy).toEqual(user.username);
        });
    })
});