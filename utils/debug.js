		if (global.__fbBatchedBridge) {
			const origMessageQueue = global.__fbBatchedBridge;
			const modules = origMessageQueue._remoteModuleTable;
			const methods = origMessageQueue._remoteMethodTable;
			global.findModuleByModuleAndMethodIds = (moduleId, methodId) => {
				console.log(`The problematic line code is in: ${modules[moduleId]}.${methods[moduleId][methodId]}`)
			}
		}

		global.findModuleByModuleAndMethodIds(28, 5);
		global.findModuleByModuleAndMethodIds(3, 9);
		global.findModuleByModuleAndMethodIds(21, 0);
