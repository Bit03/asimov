node {
	def app

	stage ("Checkout") {
		checkout scm
	}

	stage ("Build Image") {
		app = docker.build("bit03/2b:latest")
	}

	stage ("Push Image") {
		def tag = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
		docker.withRegistry("https://registry.cn-hongkong.aliyuncs.com", "cr-chainnews") {
			if (tag) {
	     	    app.push(tag)
			}
     	    app.push("latest")
  	    }
	}
}