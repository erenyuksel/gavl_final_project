FROM continuumio/miniconda3:24.1.2-0

# Creating directories
RUN mkdir -p /backend
RUN mkdir -p /frontend
RUN mkdir -p /scripts
RUN mkdir -p /envs
RUN mkdir -p /static-files
RUN mkdir -p /media-files

# Installing node.js
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl -y
RUN curl https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# Copying scripts files and give execute permissions
COPY ./scripts /scripts
RUN chmod -x /scripts

# Copying requirements before all other files
COPY ./backend/requirements.yml /backend/requirements.yml

# Creating conda env and installing requirements
RUN /opt/conda/bin/conda env create -f /backend/requirements.yml

# Overwriting PATH enveirment variable to the path to conda env
ENV PATH /opt/conda/envs/judgeemall/bin:$PATH

# Stoping python from creating unnescesary files
ENV PYTHONDONTWRITEBYTECODE=1

# Activating conda env inside container
RUN echo "source activate judgeemall" >~/.bashrc

# Changing work direction to frontend. Copying all files and installing packages
WORKDIR /frontend
COPY ./frontend/package.json /frontend/package.json
COPY ./frontend/package-lock.json /frontend/package-lock.json
RUN npm install

# Copying frontend files and building application
COPY ./frontend /frontend
RUN npm run build

# Copying backend files
COPY ./backend /backend

# Changing work direction to backend
WORKDIR /backend