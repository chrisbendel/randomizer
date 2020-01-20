import React, {useState} from 'react';
import {Button} from "reactstrap";
import {shuffleArray} from "../util/util";

export function Users() {
    const [people, setPeople] = useState([
        {name: 'Sam', checked: true},
        {name: 'Doug', checked: true},
        {name: 'Ben', checked: true},
        {name: 'Dana', checked: false},
        {name: 'Chris', checked: true}
    ]);

    const [random, setRandom] = useState([]);

    function toggleCheck(e) {
        setPeople(people.map(person => {
            return {
                ...person,
                checked: person.name === e.target.name ? !person.checked : person.checked
            }
        }));
        // const index = people.findIndex(p => p.name === e.target.name);
        // people[index].checked = !people[index].checked;
        // setPeople(people);
    }

    const selectAll = () => {
        setPeople(people.map(person => ({
            ...person,
            checked: true
        })));
    };

    const deselectAll = () => {
        const notChecked = people.map(person => {
            return {
                name: person.name,
                checked: false
            }
        });

        setPeople(notChecked);
    };

    const allSelected = () => {
        return people.every(person => person.checked);
    };

    const anySelected = () => {
        return people.some(person => person.checked);
    };

    const getChecked = () => {
        return people.filter(person => person.checked);
    };

    const generateRandom = () => {
        const randoms = [];

        getChecked().forEach(person => {
            randoms.push(person.name);
        });

        setRandom(shuffleArray(randoms));
    };

    const renderRandom = () => {
        return random.map((person, index) => {
            return (
                <p key={index} className="random-name">
                    {index + 1}. {person}
                </p>
            );
        });
    };

    const renderPeople = () => {
        return people.map(({name, checked}) => {
            return (
                <div key={name} className="person">
                    <Button onClick={toggleCheck} name={name} outline={!checked} color="primary">
                        {name}
                    </Button>
                </div>
            );
        });
    };

    return (
        <div>
            <div className="people">
                {renderPeople()}
            </div>

            <div className="action-buttons">
                {allSelected() ?
                    <Button className="all" outline color="danger" onClick={deselectAll}>
                        Clear
                    </Button>
                    :
                    <Button className="all" outline color="secondary" onClick={selectAll}>
                        Select All
                    </Button>
                }
                <Button disabled={!anySelected()} color="success" onClick={generateRandom}>
                    Randomize
                </Button>
            </div>
            <div className="random">
                {random && renderRandom()}
            </div>
        </div>
    )
}
