import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'

function SuccessCardLoading() {
  return (
    <Card style={{margin:"auto",width:"80%"}}>
        <Card.Body>
            <Card.Title style={{textAlign:"center"}}>
                <Placeholder animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
            </Card.Title>
            <Card.Subtitle style={{textAlign:"center"}}>
                <Placeholder animation="glow">
                    <Placeholder xs={4} />
                </Placeholder>
            </Card.Subtitle>
            <Card.Text style={{textAlign:"center"}}>
                <Placeholder animation="glow">
                    <Placeholder xs={3} /> <Placeholder xs={2} /> <Placeholder xs={5} />
                    <Placeholder xs={5} /> <Placeholder xs={6} />
                    <Placeholder xs={4} /> <Placeholder xs={3} /> <Placeholder xs={2} />
                </Placeholder>
            </Card.Text>
            
        </Card.Body>
        <Card.Footer>
            <Placeholder style={{marginBottom:"0.3rem"}} as={Card.Text} animation="glow">
                <Placeholder xs={3} /> <Placeholder xs={3} /> <Placeholder xs={2} />
            </Placeholder>
            <Placeholder style={{marginBottom:"0.3rem"}} as={Card.Text} animation="glow">
                <Placeholder xs={4} /> <Placeholder xs={3} /> <Placeholder xs={1} />
            </Placeholder>
            <Placeholder style={{marginBottom:"0.3rem"}} as={Card.Text} animation="glow">
                <Placeholder xs={2} /> <Placeholder xs={3} /> <Placeholder xs={3} />
            </Placeholder>
        </Card.Footer>
    </Card>
  )
}

export default SuccessCardLoading