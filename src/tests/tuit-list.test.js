import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, deleteTuit, findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {createUser, deleteUsersByUsername, findUserByUsername} from "../services/users-service";

// jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  {tuit: "alice's tuit", postedBy: "Alice", _id: "4444"},
  {tuit: "bob's tuit", postedBy: "Bob", _id: "5555"},
  {tuit: "charlie's tuit", postedBy: "Charlie", _id: "6666"},
];


describe('render from static', () => {
  test('tuit list renders static tuit array', () => {
    const deleteATuit = (tid) =>
        deleteTuit(tid)
            .then();

    render(
        <HashRouter>
          <Tuits tuits={MOCKED_TUITS} deleteTuit={deleteATuit}/>
        </HashRouter>);

    const expectations = [/alice's tuit/i, /bob's tuit/i, /charlie's tuit/i, /Alice/i, /Bob/i, /Charlie/i];

    expectations.forEach((expectation) => {
      let linkElements = screen.getAllByText(expectation);

      linkElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
  });
});

describe('render from async', () => {
  const adam = {
    username: 'adam_smith',
    password: 'adamsmith',
    email: 'adam@smith.com'
  };
  const sampleTuit = {
    tuit: 'Test Tuit 1',
  };
  let tids = [];
  let tuits = [];
  let newUser;
  beforeAll(async () => {
    await deleteUsersByUsername(adam.username);
    newUser = await createUser(adam);
    for (let tuitCount = 0; tuitCount < 5; tuitCount++) {
      const tuit = `Test Tuit ${tuitCount + 1}`;
      sampleTuit.tuit = tuit;
      sampleTuit.postedBy = newUser.username;
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
    promises.push(deleteUsersByUsername(adam.username));
    return Promise.all(promises);
  });
  test('tuit list renders async', async () => {
    const allTuits = await findAllTuits();
    const user = await findUserByUsername(adam.username);
    const createdTuits = allTuits.filter(
        (tuit) => tids.indexOf(tuit._id) >= 0);
    const deleteATuit = (tid) =>
        deleteTuit(tid)
            .then();
    render(
        <HashRouter>
          <Tuits tuits={createdTuits} deleteTuit={deleteATuit}/>
        </HashRouter>);
    tuits.forEach((tuit) => {
      let linkElements = screen.getAllByText(tuit);
      linkElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      })
    })
  })
});

describe('render from mock', () => {
  test('tuit list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation(() =>
                                Promise.resolve({data: {tuits: MOCKED_TUITS}}));

    const response = await findAllTuits();
    const tuits = response.tuits;
    mock.mockRestore();

    const deleteATuit = (tid) =>
            deleteTuit(tid).then();

    render(
        <HashRouter>
          <Tuits tuits={tuits} deleteTuit={deleteATuit}/>
        </HashRouter>);

    const expectations = [/alice's tuit/i, /bob's tuit/i, /charlie's tuit/i, /Alice/i, /Bob/i, /Charlie/i]

    expectations.forEach((expectation) => {
      let linkElements = screen.getAllByText(expectation);

      linkElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    })
  });
});