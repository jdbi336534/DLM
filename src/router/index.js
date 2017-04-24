import Vue from 'vue'
import Router from 'vue-router'
import dcp from '@/components/dcp'
import routeError from '@/components/common/RouteError'
import blackroute from '@/components/common/BlackRoute'
import main from '@/components/main/main'
import login from '@/components/login/login1'
import node from '@/components/system/node'
import nodedetails from '@/components/system/nodedetails'
import serviceManager from '@/components/system/serviceManager'
import servicedetails from '@/components/system/servicedetails'
import virtualNode from '@/components/system/virtualNode'
import virtualNodelookup from '@/components/system/virtualNodelookup'
import serviceDiscovery from '@/components/system/serviceDiscovery'
import configurationManagement from '@/components/system/configurationManagement'
import logsManagement from '@/components/system/logsManagement'
import offLinelogs from '@/components/system/offLinelogs'
import onLinelogs from '@/components/system/onLinelogs'
import security from '@/components/system/security'
import serviceDiscoverydetail from '@/components/system/serviceDiscoverydetails'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '',
        redirect: 'login'
    }, {
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/main',
        name: 'main',
        component: main
    }, {
        path: '/dcp',
        name: 'dcp',
        component: dcp,
        children: [{
            path: 'system',
            name: 'system',
            component: blackroute,
            redirect: { name: 'node' },
            children: [{
                path: 'node',
                name: 'node',
                component: node
            }, {
                path: 'nodedetails/:ip',
                name: 'nodedetails',
                component: nodedetails
            }, {
                path: 'serviceManager',
                name: 'serviceManager',
                component: serviceManager
            }, {
                path: 'servicedetails/:ip',
                name: 'servicedetails',
                component: servicedetails
            }, {
                path: 'virtualNode',
                name: 'virtualNode',
                component: virtualNode
            }, {
                path: 'virtualNodelookup/:node',
                name: 'virtualNodelookup',
                component: virtualNodelookup
            }, {
                path: 'serviceDiscovery',
                name: 'serviceDiscovery',
                component: serviceDiscovery
            }, {
                path: 'serviceDiscoverydetail/:ip',
                name: 'serviceDiscoverydetail',
                component: serviceDiscoverydetail
            }, {
                path: 'configurationManagement',
                name: 'configurationManagement',
                component: configurationManagement
            }, {
                path: 'logsManagement',
                name: 'logsManagement',
                component: logsManagement
            }, {
                path: 'offLinelogs',
                name: 'offLinelogs',
                component: offLinelogs
            }, {
                path: 'onLinelogs/:pod',
                name: 'onLinelogs',
                component: onLinelogs
            }, {
                path: 'security',
                name: 'security',
                component: security
            }]
        }]
    }, {
        path: '/*',
        name: 'error',
        component: routeError
    }]
})
