import fetch from './fetch'
// 为了之后打包方便，common为普通页面的列表等接口
// chart为图表类的接口
let COMMON = '/common';
let CHART = '/chart';
let OFFLOGS = '/offlogs';
let CHARTONE = 'api/v1/proxy/namespaces/kube-system/services/heapster';
// 命名空间后面，现在是固定的，以后会变成多个
let PERMISSIONS = 'kube-system';
/** *****************************************蒋东兵***************************************************/
// 节点列表接口、详情接口
var getNode = (nodeip) => fetch('GET', `${COMMON}/api/v1/nodes/${nodeip}`);
// 获得虚拟节点列表
var getPods = (namespace, virnode) => fetch('GET', `${COMMON}/api/v1/namespaces/${namespace}/pods/${virnode}`);
// 删除虚拟节点
var deletePods = (namespace, virnode) => fetch('DELETE', `${COMMON}/api/v1/namespaces/${namespace}/pods/${virnode}`);
// 从此接口中获取下拉选框的第一级
var getfirstCascader = (namespace) => fetch('GET', `${COMMON}/api/v1/namespaces/${namespace}/services`);
// 从此接口中获取在线日志,返回的是字符串，所以不能用这个
var getLogs = (namespace, pod, succed, failed) => $.ajax({ url: `${COMMON}/api/v1/namespaces/${namespace}/pods/${pod}/log`, 'success': succed, 'error': failed });
// 离线日志中的下拉选框中的数据
var getSelect = (name) => fetch('GET', `${OFFLOGS}/tati/count/${name}?page=1&size=100&sortfile=@timestamp&sortorder=DESC`);
// 获取离线日志表格的所有数据
var gettableDate = (data) => fetch('GET', `${OFFLOGS}/tati/logs/field?page=${data.page}&size=${data.size}&sortfile=@timestamp&sortorder=DESC`);
// 根据条件获取离线日志变革数据
var getoffLogs = (data) => fetch('GET', `${OFFLOGS}/tati/logs/field?page=${data.page}&size=${data.size}&sortfile=@timestamp&sortorder=DESC&gTime=${data.starttime}&lTime=${data.endtime}&level=${data.level}&name=${data.name}&node=${data.node}`);
// 搜索离线日志列表的接口
var searchoffLogs = (data) => fetch('GET', `${OFFLOGS}/tati/logs/field?page=${data.page}&size=${data.size}&sortfile=@timestamp&sortorder=DESC&gTime=${data.starttime}&lTime=${data.endtime}&level=${data.level}&name=${data.name}&node=${data.node}&msg=${data.msg}`);
/** *****************************************蒋东兵***************************************************/
/** *****************************************赵凯芳***************************************************/
// 服务管理接口
var getServices = () => fetch('GET', `${COMMON}/api/v1/namespaces/${PERMISSIONS}/services`);
// 服务发现接口
var servicesDiscovery = () => fetch('GET', `${COMMON}/api/v1/namespaces/${PERMISSIONS}/services`);
// 服务发现详情接口
var servicesDiscoverydetails = (detailsname) => fetch('GET', `${COMMON}/api/v1/namespaces/${PERMISSIONS}/services/${detailsname}`);
// 服务发现删除的接口
var deleteservicesDiscovery = (detailsname) => fetch('DELETE', `${COMMON}/api/v1/namespaces/${PERMISSIONS}/services/${detailsname}`);
// node 节点
var nodechart = (obj) => fetch('GET', `${COMMON}/${CHARTONE}/api/v1/model/nodes/${obj.ip}/metrics/${obj.type}/${obj.name}`);
// node 集群cpu
var nodeclusterchart = (obj) => fetch('GET', `${CHART}/api/v1/model/metrics/${obj.type}/${obj.name}`);
// 获得虚拟节点的某个cpu和网络数据的接口
var virnodeone = (obj) => fetch('GET', `${COMMON}/${CHARTONE}/api/v1/model/namespaces/${PERMISSIONS}/pods/${obj.ip}/metrics/${obj.type}/${obj.name}`);
/** *****************************************赵凯芳***************************************************/
// 目录发布
// var modifyDataSourceInfo = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/modifyDataSourceInfo`, data);
// var publishCatalogue = (obj) => fetch('PUT', `${PROXY}/catalogue/v1.0/publishCatalogue`, obj);
export {
    /** *******蒋东兵*********/
    getNode,
    getPods,
    deletePods,
    getfirstCascader,
    getLogs,
    getSelect,
    gettableDate,
    getoffLogs,
    searchoffLogs,
    /** *******蒋东兵*********/
    /** *******赵凯芳********/
    getServices,
    servicesDiscovery,
    servicesDiscoverydetails,
    deleteservicesDiscovery,
    nodechart,
    nodeclusterchart,
    virnodeone,
    /** *******赵凯芳********/
}
