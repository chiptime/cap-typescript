using {example} from '../db/index';
using {UserService} from './createUser/index';

service TaskService @(
    impl : './index.js',
    path : '/task'
) {
    entity Task as select from example.Tasks;
    entity TasksStore as select from example.TasksStore;
}
