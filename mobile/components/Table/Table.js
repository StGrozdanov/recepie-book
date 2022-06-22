import { useState } from 'react';
import ActionsDropdown from '../ActionsDropdown/ActionsDropdown';
import TableHead from '../Table/TableHead/TableHead'
import TableBody from '../Table/TableBody/TableBody';

export default function Table({
    isEven,
    isFirst,
    isLast,
    name,
    data,
    pictureType,
    pictureSource,
    deleteAction,
    editAction,
    removeAction,
    blockAction,
    approveAction,
    changeRoleAction,
}) {
    const [isToggled, setIsToggled] = useState(false);
    const [dropdownIsExpanded, setDropdownIsExpanded] = useState(false);

    function toggleHandler() {
        if (isToggled) {
            setIsToggled(false);
            setDropdownIsExpanded(false);
        } else {
            setIsToggled(true);
        }
    }

    function optionsHandler() {
        if (dropdownIsExpanded) {
            setDropdownIsExpanded(false);
        } else {
            setDropdownIsExpanded(true);
            setIsToggled(true);
        }
    }

    return (
        <>
            <TableHead
                pictureSource={pictureSource}
                pictureType={pictureType}
                contentName={name}
                isEven={isEven}
                isFirst={isFirst}
                isLast={isLast}
                isToggled={isToggled}
                optionsHandler={optionsHandler}
                toggleHandler={toggleHandler}
            />
            <TableBody isToggled={isToggled} data={data} />
            {dropdownIsExpanded &&
                <ActionsDropdown
                    deleteAction={deleteAction}
                    editAction={editAction}
                    blockAction={blockAction}
                    approveAction={approveAction}
                    removeAction={removeAction}
                    changeRoleAction={changeRoleAction}
                />
            }
        </>
    );
}