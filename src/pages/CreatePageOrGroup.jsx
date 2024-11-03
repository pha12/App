import React, { useState } from "react";

const CreatePageOrGroup = ({ addPageOrGroup }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("page");
    const [isPublic, setIsPublic] = useState(true);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !description) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        addPageOrGroup({ name, description, type, isPublic });
        setName("");
        setDescription("");
        setType("page");
        setIsPublic(true);
        setIsFormVisible(false); // Cache le formulaire après la soumission
    };

    return (
        <div className="create-page-group">
            <button onClick={toggleFormVisibility} className="toggle-form-button">
                {isFormVisible ? "Annuler" : "Créer une Page ou un Groupe"}
            </button>
            
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <h2>Créer une Page ou un Groupe</h2>
                    <label>
                        Nom :
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required
                        />
                    </label>
                    <label>
                        Description :
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            required
                        />
                    </label>
                    <label>
                        Type :
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="page">Page</option>
                            <option value="group">Groupe</option>
                        </select>
                    </label>
                    <label>
                        Public :
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                        /> Rendre public
                    </label>
                    <button type="submit">Créer</button>
                </form>
            )}
        </div>
    );
};

export default CreatePageOrGroup;

