module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			stylesheets: {
				files: 'static/stylesheets/**/*.less',
				tasks: ['less']
			}
		},

		less: {
			dev: {
				files: {
					'static/stylesheets/acme.css': 'static/stylesheets/less/main.less'
				}
			},
			prod: {
				options: {
					compress: true
				},
				files: {
					'static/stylesheets/acme.min.css': 'static/stylesheets/less/main.less'
				}
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', []);
	grunt.registerTask('dev', ['watch']);
}