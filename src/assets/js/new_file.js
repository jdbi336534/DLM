吴永磊 19:34:09
	//目录管理
	var showTree = () => fetch('POST','/catalogue/v1.0/getCatalogueInfoByParam','{"themeTypeId":3}');//树形展示
	var selectOne = (id) => fetch('GET','/catalogue/v1.0/getCatalogueInfoById/${id}');//根据id查询目录信息
	var saveCatalogue = () => fetch('POST','/catalogue/v1.0/saveCatalogueInfo','{"typeDescription":"thisisarootcatalogue","supplyUnit":"社保局","informativeAbstract":null,"rootNode":0,"typeCode":"root","frontNode":0,"path":"/北京","permissionLevel":null,"supplyType":"社保数据","catalogueName":"北京","themeTypeId":3,"catalogueCode":null,"catalogueTypeId":8,"status":"F"}');//新增目录
	var deleteCatalogue = () => fetch('PUT','/catalogue/v1.0/deleteCatalogueInfo','{"id":1,"idList":[2,3,4]}');//删除目录(暂时不考虑目录删除功能)
	var updateCatalogueInfo = () => fetch('PUT','/catalogue/v1.0/updateCatalogueInfo','{"id":1,"typeDescription":"thisisarootcatalogue","supplyUnit":"社保局","informativeAbstract":null,"rootNode":0,"typeCode":"root","frontNode":0,"path":"/北京","permissionLevel":null,"supplyType":"社保数据","catalogueName":"北京","themeTypeId":3,"catalogueCode":null,"catalogueTypeId":8,"status":"F"}');//修改目录
	var publishCatalogue = () => fetch('PUT','/catalogue/v1.0/publishCatalogue','{"id":1,"idList":[2,3,4]}');//目录发布
	
	
	
	//资源发布
	var publishedResourcesList = () => fetch('POST','/catalogue//v1.0/findPublishDataResourceList','{"pageNum":1,"pageSize":5,"id":3}');//查询已发布的资源
	var unPublishResourcesList = () => fetch('POST','/catalogue/v1.0/findUnpublishDataResourceList','{"pageNum":1,"pageSize":5,"id":3}');//查询未发布的资源
	var batchSave = () => fetch('POST','/catalogue/v1.0/batchSaveCatalogueResourceRelation','{["resourcesId":1,"catalogueId":3,"resourcesColumnId":192]}');//发布资源
	
	
	