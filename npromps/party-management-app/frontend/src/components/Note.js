import React, { useState } from 'react';

const Note = ({ note, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(note.content);

    const handleUpdate = () => {
        onUpdate(note.id, updatedContent);
        setIsEditing(false);
    };

    return (
        <div className="note">
            {isEditing ? (
                <div>
                    <textarea
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Actualizar</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <p>{note.content}</p>
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                    <button onClick={() => onDelete(note.id)}>Eliminar</button>
                </div>
            )}
        </div>
    );
};

export default Note;