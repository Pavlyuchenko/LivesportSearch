import { useParams, useLocation, Navigate } from "react-router-dom";

function DetailComponent() {
    const { id } = useParams(); // Get ID from URL
    const location = useLocation();
    const item = location.state?.obj; // Get full object from state
    const teamData = item;
    if (!item) {
        // redirect to home if no item is found
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>{item.name}</h1>

            {item ? (
                <div>
                    <div>
                        <h2>Team Highlights</h2>
                        <div>
                            <strong>Sport:</strong> {item.sport.name} (
                            {item.gender.name})
                        </div>
                        {item.defaultCountry && (
                            <div>
                                <strong>Country:</strong>{" "}
                                {item.defaultCountry.name}
                            </div>
                        )}
                        <div>
                            <strong>Team Type:</strong> {item.type.name}
                        </div>
                    </div>

                    {item.defaultTournament && (
                        <div>
                            <h2>Tournament</h2>
                            <div>
                                <strong>Current Tournament:</strong>{" "}
                                {item.defaultTournament.name}
                            </div>
                        </div>
                    )}

                    {item.images && item.images.length > 0 && (
                        <div>
                            <h2>Media</h2>
                            <div>
                                <strong>Available Images:</strong>{" "}
                                {item.images.length}
                            </div>
                        </div>
                    )}

                    {item.participantTypes &&
                        item.participantTypes.length > 0 && (
                            <div>
                                <h2>Participation</h2>
                                <div>
                                    <strong>Participant Categories:</strong>{" "}
                                    {item.participantTypes.length}
                                </div>
                            </div>
                        )}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default DetailComponent;
