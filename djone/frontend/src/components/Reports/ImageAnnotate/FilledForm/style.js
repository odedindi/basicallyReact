import styled from 'styled-components';

export const TouchVoltageLayout = styled.div`
.custom-input {
    border: none;
    color: #AAAAAA i !important;
    font-weight: 400;
    line-height: 1.42857;
    letter-spacing: unset;
    border-bottom: 1px solid #999;
    height: 2em;
    margin-top: 1vh;
    margin-bottom: 1vh;
    font-size: 1rem;
    padding-bottom: 0;
    resize: none;
}


.custom-input:focus {
    animation-name: input;
    animation-duration: 0.5s;
    border-bottom: 2px solid #f20f37;
}

.custom-input:focus::-webkit-input-placeholder {
    color: transparent;
}
#main-form {
    margin-top: 2rem;
}
.card-header {
    height: 3rem;
    >:first-child {
        margin-top: -.1rem
    }
    > * {
        margin-bottom: -1rem;
    }
}
.input-container {
    display: flex;
    justify-content: space-between;
    .left-inputs {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
}
.right-inputs {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
}
}
    .input-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
        input {
            width: 80%;
        }
        label {}

        textarea {}
    }
`;