import React from 'react';
import TitleItem from './TitleItem';

function Title(props) {
    const titleItems = props.titles.map((title, key) => {
        return (
            <TitleItem
                showModal={props.showModal}
                key={key+title.id}
                title={title} />
        )
    });

    return (
        <div>
            {titleItems}
        </div>
    );
}

export default Title;