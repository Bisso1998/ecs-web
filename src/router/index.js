import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/pages/Home.vue'
import PratilipiComponent from '@/pages/Pratilipi.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: HomeComponent
    }, {
    	path: '/story/:pratilipi_id',
        name: 'Pratilipi',
        component: PratilipiComponent
    }]
})
