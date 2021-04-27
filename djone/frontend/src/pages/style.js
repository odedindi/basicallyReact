import styled from 'styled-components';

export const LoginLayout = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #loginLogo {
        max-width: 500px;
        min-width: 350px;
        width: 25%;
        margin-bottom: 5rem;
    }
    #loginForm {
        max-width: 500px;
        min-width: 350px;
        min-height: 300px;
        width: 35%;
        height: 25%;
        color: #fff;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: .5rem;
        box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.2);

        > * {
            margin-bottom: 1.5rem;
        }

        background-color: #930901;
        h1 {
            font-weight: 400;
            font-size: 2.5rem;
        }
        .input-group {
            display: flex;
            flex-direction: column;
            label {
                color: #fff;
                margin-bottom: .5rem;
            }
            input {
                width: 80%;
                height: 1.5rem;
            }
        }
        button {
            border-radius: .3rem;
            font-size: 1.2rem;
            border: none;
            outline: none;
            width: 30%;
            margin-right: auto;
        }
    }
`;