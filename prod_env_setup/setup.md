# push images to docker from local:

0) cd to local repo path
1) login: "doctl registry login"
2) build and tag the image in local env: "docker-compose build"
2) push the docker image tag: "docker push registry.digitalocean.com/auto-canon/be-node-app:latest"

# digital ocean api :
name: autocanon
token: dop_v1_5ad9ed975ea1552bb91f8c4898c3c615e8cea47f21865b9e213030196423a1d2

# droplet password:
Auto@123Canon

# ------------------ steps to configure digital ocean droplet with docker and doctl (one time) START------------------ 
# 1) create a droplet with ubuntu image (any latest version)
#   connect to droplet VM:
        ssh root@64.227.168.164
        password: Auto@123Canon

# 2) install doctl (this is the cmd interface to connect with digital ocean resources like container rigistry)
	1) cd ~
		wget https://github.com/digitalocean/doctl/releases/download/v1.92.0/doctl-1.92.0-linux-amd64.tar.gz
	2) tar xf ~/doctl-1.92.0-linux-amd64.tar.gz
	3) sudo mv ~/doctl /usr/local/bin

# 3) Create an digital ocean API token
	or use the existing API token: dop_v1_5ad9ed975ea1552bb91f8c4898c3c615e8cea47f21865b9e213030196423a1d2

# 4) Use the API token to grant account access to doctl
	1) doctl auth init --context autocanon
	2) doctl auth list
	3) doctl auth switch --context autocanon

# 5) Validate that doctl is working
	1) doctl account get

# 6) install docker and docker-compose
# 	1) install docker:
		1) curl -fsSL https://get.docker.com -o get-docker.sh
		2) sh get-docker.sh
# 	2) install docker-compose
		1) sudo curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
		2) sudo chmod +x /usr/local/bin/docker-compose
		3) docker-compose --version

# 7) copy over the nginx conf file (one time while creating new droplet)
scp <repo_path>/nginx/default.conf root@64.227.168.164:/home/auto-canon-be/nginx

# ------------------ steps to configure digital ocean droplet with docker and doctl (one time) END------------------ 

# steps to connect to digital ocean container registry and run the application:

1) cd /home/auto-canon-be
2) doctl registry login
2) docker-compose pull
3) docker-compose up -d --build

# If changes done to prod-env/docker-compose.yml file, then it should be copied over to "/home/auto-canon-be" folder of the droplet

scp <repo_path>/prod_env_setup/docker-compose.yml root@64.227.168.164:/home/auto-canon-be