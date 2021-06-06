using {createUser} from '../../db/createUser/index';

service UserService @(
    impl : './index.js',
    path : '/user'
) {
    entity User as select from createUser.User;
}
