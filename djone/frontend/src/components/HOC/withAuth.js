import { useSelector } from 'react-redux';

export const withAuth = (WrappedComponent) => {
    return (props) => {
        const token = useSelector(state => state.axpoReducer.token);
        if (token) {
            return <WrappedComponent />;
        } else {
            props.history.push('/login');
            return null;
        }
    }
};