import { useNoAdminAuth } from './../customHooks';

const WithoutAdminAuth = props => !useNoAdminAuth(props) && props.children;

export default WithoutAdminAuth;
