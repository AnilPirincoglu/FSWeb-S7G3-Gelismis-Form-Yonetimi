import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";

export default function FormList(args) {

    const { users } = args;

    return (
        <div data-cy="membercard" className="membercard-list">
            {users
                .map((user, index) =>
                    <Card key={index} className="my-2" color="light" style={{ width: 18 + 'rem' }} >
                        <CardHeader>
                            <strong>{user.name}</strong>
                        </CardHeader>
                        <CardBody>
                            <CardTitle tag="h5">
                                E-mail
                            </CardTitle>
                            <CardText>
                                {user.email}
                            </CardText>
                        </CardBody>
                    </Card>

                )}
        </div>
    );
};