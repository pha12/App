import React from "react";

const PagesAndGroupsList = ({ pagesAndGroups, onItemClick }) => {
    return (
        <div className="pages-groups-list">
            <h2>Toutes les Pages et Groupes</h2>
            {pagesAndGroups.length > 0 ? (
                <ul>
                    {pagesAndGroups.map((item) => (
                        <li key={item.id} onClick={() => onItemClick(item)}>
                            <h3>{item.name}</h3>
                            <p>{item.type === "page" ? "Page" : "Groupe"}</p>
                            <p>Créé par : {item.creator}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune page ou groupe disponible.</p>
            )}
        </div>
    );
};

export default PagesAndGroupsList;
