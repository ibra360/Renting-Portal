import React from 'react';
import AdItem from './AdItem'

const AdList = (props) => {
    if (props.items.length === 0) {
        return (
            <div>
                <h2 class="card">No Ads Found. Want to add one?</h2>
                <a href="/ads/new"><button class="btn btn-primary" >Share PLace</button></a>
            </div>
        )
    }
    return (
        <ul>
            {props.items.map(ad => (
                <AdItem
                    key={ad.id}
                    id={ad.id}
                    image={ad.image}
                    title={ad.title}
                    description={ad.description}
                    address={ad.address}
                    creatorId={ad.creator}
                    onDelete={props.onDeleteAd}
                />
            ))}
        </ul>
    )

};

export default AdList;