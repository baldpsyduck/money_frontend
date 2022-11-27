import styled from "@emotion/styled";
import QuestionSet from "../../components/QuestionSet";

export default function CharacterTest() {


    return (
        <Container>
            <QuestionSet/>
        </Container>
    )
}
const Container=styled.div`
    background-color:white;
    width:100%;
    height:100%;
    overflow:auto
`