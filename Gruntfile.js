module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			stylesheets: {
				files: 'public/stylesheets/**/*.less',
				tasks: ['less:dev']
			}
		},

		less: {
			dev: {
				files: {
					'public/stylesheets/acme.css': 'public/stylesheets/less/main.less'
				}
			},
			prod: {
				options: {
					compress: true
				},
				files: {
					'public/stylesheets/acme.min.css': 'public/stylesheets/less/main.less'
				}
			}
		},

		useminPrepare: {
			html: 'build/index.html',
			options: {
				dest: 'build'
			}
		},
		usemin: {
			html: 'build/index.html',
			options: {
				dest: 'build'
			}
		},

		copy: {
			html: {
				src: ['public/index.html'],
				dest: 'build/index.html'
			},
			css: {
				src: ['public/stylesheets/acme.min.css'],
				dest: 'build/assets/css/acme.min.css'
			},
			fonts: {
				expand: true,
				flatten: true,
				src: ['public/fonts/**'],
				dest: 'build/assets/fonts/'
			}
		},

		clean: {
			build: ['build/'],
			tmp: ['.tmp/']
		}
	})

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', []);
	grunt.registerTask('dev', ['watch']);

	/* Build task */
	grunt.registerTask('build', [
		'clean', 
		'less:prod', 
		'copy:css', 
		'copy:html',
		'useminPrepare',
		'concat',
		'uglify',
		'usemin',
		'copy:fonts',
		'clean:tmp'
	])
}