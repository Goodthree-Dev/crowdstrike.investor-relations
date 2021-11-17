pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                sh 'bundle install'
            }
        }

        stage('Jekyll Runner') {
            steps {
                sh 'jekyll build'
            }
        }

        stage('Deploy to Staging Site') {
            when {
                branch 'master'
            }
            steps {
                sh 'rm -rf ./Gemfile.json'
                sh 'rm -rf ./Gemfile'
                sh 'scp -o StrictHostKeyChecking=no -r ./* root@165.227.27.105:/var/www/crowdstrike-ir.goodthreestage.com/public_html/'
            }
        }
    }

    post {
        success {
            slackSend color: 'good', message: 'Successful Build of CrowdStrike Investor Relations! :partying_face:'
        }

        failure {
            slackSend color: '#FF0000', message: 'Build of CrowdStrike Investor Relations Failed! :alarm_clock:'
        }
    }
}
