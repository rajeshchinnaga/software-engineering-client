import {act, create} from "react-test-renderer";
import MyDislikes from "../components/profile/my-dislikes";
import {HashRouter} from "react-router-dom";
import * as React from 'react';

const MOCKED_TUITS = [
    {_id:1, tuit:"alice tuit", postedBy : {username:"alice", password:"alice123", email: "a@g.com"},stats:{replies:0,retuits:0,likes:0,dislikes:0}},
    {_id:2, tuit:"user tuit", postedBy : {username:"user", password:"user123", email: "u@g.com"},stats:{replies:0,retuits:0,likes:0,dislikes:0}},
    {_id:3, tuit:"charlie tuit", postedBy : {username:"charlie", password:"charlie123", email: "c@g.com"},stats:{replies:0,retuits:0,likes:0,dislikes:0}}
]



test('test whether dislikes screen is rendered properly with proper tuits', () => {

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    useStateSpy.mockImplementation((MOCKED_TUITS) => [MOCKED_TUITS, setState]);

    let tuits
    act(() => {
        tuits = create(
            <HashRouter>
                <MyDislikes/>
            </HashRouter>
        )
    })
    const root = tuits.root;
    const tuitItems = root.findAllByProps({className: 'pe-2'})
    expect(tuitItems.length).toBe(MOCKED_TUITS.length)
})

