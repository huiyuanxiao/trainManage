export default  function routerConfig(router) {
    router.map({
        '/register': {
            name: 'register',
            component: function (resolve) {
                require(['./../../component/register.vue'], resolve)
            }
        },
        '/login': {
            name: 'login',
            component: function (resolve) {
                require(['./../../component/login.vue'], resolve)
            }
        },
        '/training/:trainName/:trainContent/:trainTime/:trainAddress/:nameContent': {
            name: 'training',
            component: function (resolve) {
                require(['../../component/training.vue'], resolve)
            }
        },
        '/training-go/:nameList': {
            name: 'training-go',
            component: function (resolve) {
                require(['../../component/training-go.vue'], resolve)
            }
        },
        '/train-people': {
            name: 'train-people',
            component: function (resolve) {
                require(['../../component/train-people.vue'], resolve)
            }
        },
        '/trainmanage/:trainName/:trainContent/:trainTime/:trainAddress/:trainPeople/:trainId': {
            name: 'trainmanage',
            component: function (resolve) {
                require(['../../component/trainmanage.vue'], resolve)
            }
        },
    });
    router.redirect({
        '*': "/register"
    });
}