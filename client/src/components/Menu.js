import React from 'react';


const Menu = ({ selectedMenu, selectedRankBy, onSelect, onChangeRankBy }) => {
    return (
        <div className="tabs is-boxed">
            <ul>
                <li className={ selectedMenu == 'proj' ? 'is-active' : '' }
                    onClick={() => onSelect('proj')}>
                    <a>
                        <span>Projected</span>
                    </a>
                </li>
                <li className={ selectedMenu == 'last' ? 'is-active' : '' }
                    onClick={() => onSelect('last')}>
                    <a>
                        <span>Last Season</span>
                    </a>
                </li>
                <li>
                    <a>
                        <div className="select is-primary is-small">
                            <select value={selectedRankBy} onChange={onChangeRankBy}>
                                <option value="pergame">Per Game</option>
                                <option value="zscores">Z-Scores</option>
                            </select>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Menu;