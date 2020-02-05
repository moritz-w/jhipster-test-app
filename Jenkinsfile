#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh "java -version"
    }

    stage('clean') {
        sh "chmod +x mvnw"
        sh "./mvnw -ntp clean"
    }
    stage('nohttp') {
        sh "./mvnw -ntp checkstyle:check"
    }

    stage('install tools') {
        sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:install-node-and-npm -DnodeVersion=v12.13.1 -DnpmVersion=6.13.4"
    }

    stage('npm install') {
        sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:npm"
    }

//    stage('backend tests') {
//        try {
//            sh "./mvnw -ntp verify"
//        } catch(err) {
//            throw err
//        } finally {
//            junit '**/target/test-results/**/TEST-*.xml'
//        }
//    }

//    stage('frontend tests') {
//        try {
//            sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:npm -Dfrontend.npm.arguments='run test-ci'"
//        } catch(err) {
//            throw err
//        } finally {
//            junit '**/target/test-results/**/TEST-*.xml'
//        }
//    }
   
//    stage('quality analysis') {
//        withSonarQubeEnv('sonar') {
//            sh "mvn sonar:sonar"
//        }
//    }

   stage('packaging') {
       sh "./mvnw -ntp verify -Pprod,heroku -DskipTests"
       archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
   }
   
   stage('deploy'){
       sh "heroku deploy:jar target/*.jar -a jhipster-todo-app"
   }
}
