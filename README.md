Heyy, welcome to my project repository. 
NAME: GINIKA NWOKEJI
ALT ID: ALT/SOE/024/1229.
PUBLIC IP: (http://52.90.66.123)
I created a directory for the project and created three files: index.html, style.css, and script.js. Then i created a new repository on Github. I went back to my vscode terminal and initialized git for my project.git init
git init
git add index.html
git add style.css
git add script.js
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Chrimau/client_prototype.git
git push -u origin main

Afterwards, I wrote content for the landing page of the prototype in my index.html file.

# Step-by-Step Documentation for Setting Up a Web Server on AWS EC2

# Prerequisites:
- An **AWS** account.
- Aaccess to the AWS **Management Console**.
- **SSH key pair** (.pem file) for EC2 access.
- A **local machine** to copy files to the EC2 instance.


 1. **Provision an EC2 Instance**

# 1.1. Launch an EC2 Instance:
1. Log in to the **AWS Management Console**.
2. Navigate to **EC2** under the **Services** menu.
3. Click **Launch Instance** to start the process of provisioning a new EC2 instance.
4. **Choose an Amazon Machine Image (AMI)**:
   - Select an **Amazon Linux 2 AMI** (or any Linux distribution you prefer).
5. **Choose an Instance Type**:
   - Select a **t2.micro** instance (eligible for the free tier).
6. **Configure Instance**:
   - Set the configuration to your preferences (e.g., leave default settings).
7. **Add Storage**:
   - The default disk size (8 GB) is usually sufficient, but adjust based on your needs.
8. **Configure Security Group**:
   - Create or select a **security group** allowing inbound SSH (port 22) and HTTP (port 80).
     - Add a rule for SSH (`port 22`) from your IP address.
     - Add a rule for HTTP (`port 80`) to allow access to your web server from anywhere (`0.0.0.0/0`).
9. **Launch the Instance**:
   - Review your settings, then click **Launch**.
   - Select an existing SSH key pair or create a new one. Download the key file (.pem) and save it securely.

# 1.2. Connect to Your EC2 Instance:
1. After the instance state is **running**, get the **public IP** or **public DNS** of your EC2 instance.
2. SSH into your EC2 instance from your local machine, using the following command (replace with your actual `.pem` file path and public IP):

   ```bash
   ssh -i /path/to/your-key.pem ec2-user@your-ec2-public-ip
   ```


# 2. **Install Apache Web Server**

# 2.1. Update Package Lists:
Once connected to your EC2 instance, update the package list to ensure you’re installing the latest versions:

```bash
sudo apt update -y
```

# 2.2. Install Apache Web Server (HTTPD):
Run the following command to install Apache:

```bash
sudo apt install apache2 -y
```

# 2.3. Start the Apache Service:
Enable and start Apache (httpd):

```bash
sudo systemctl enable apache2
sudo systemctl start apache2
```

# 2.4. Check Apache Status:
Verify that Apache is running by checking its status:

```bash
sudo systemctl status apache2
```

If it's running, you should see output indicating that Apache is active.

---

# 3. **Deploy the HTML Page**

#### 3.1. Upload Your HTML Files:
You can upload your HTML files (and images, CSS, etc.) to the EC2 instance using SCP or SFTP. Here's how to do it using SCP from your **local machine**:

**SCP Command** (Replace with your actual file paths and EC2 public IP):
```bash
scp -i /path/to/your-key.pem /path/to/local/index.html ec2-user@your-ec2-public-ip:/home/ec2-user/
```

If you have an `images` folder or additional assets, you can upload them similarly:

```bash
scp -i /path/to/your-key.pem -r /path/to/local/images ec2-user@your-ec2-public-ip:/home/ec2-user/images
```

#### 3.2. Move Files to the Web Directory:
Apache serves files from `/var/www/html` by default. Move your `index.html` and other assets to that directory:

```bash
sudo mv /home/ec2-user/index.html /var/www/html/
sudo mv /home/ec2-user/images /var/www/html/
```

#### 3.3. Set Correct Permissions:
Ensure that Apache has permission to serve the files:

```bash
sudo chown -R apache:apache /var/www/html/
sudo chmod -R 755 /var/www/html/
```

---

### 4. **Configure Networking and Security**

#### 4.1. Open Firewall Ports (Security Group Settings):
If you haven’t already done so during instance creation, ensure the **Security Group** associated with your EC2 instance allows traffic on the necessary ports:

1. **SSH (Port 22)**: To allow you to connect to the server via SSH.
2. **HTTP (Port 80)**: To allow access to your website via a browser.

To check and modify security group settings:
1. Go to the **EC2 Dashboard**.
2. Under **Network & Security**, click **Security Groups**.
3. Select the security group associated with your EC2 instance.
4. Click **Edit inbound rules** and ensure that **HTTP (port 80)** is open to all (`0.0.0.0/0`), and **SSH (port 22)** is open only from your IP address for security.

#### 4.2. Check EC2 Instance’s Public IP:
Find the **public IP address** or **public DNS** of your EC2 instance in the AWS Management Console. This is used to access your website via a browser.

---

### 5. **Test the Website**

#### 5.1. Access the Web Server:
Open a browser and enter the **public IP address** or **public DNS** of your EC2 instance. For example:

```
http://your-ec2-public-ip
```

You should see the HTML page you deployed. If you uploaded images and other assets, ensure they are correctly displayed on the page.

---

### 6. **(Optional) Set Up a Domain Name (DNS)**

If you want to associate a domain name with your EC2 instance:

1. Purchase a domain name through a domain registrar (e.g., GoDaddy, Namecheap).
2. In **AWS Route 53**, create a hosted zone for your domain.
3. Create an **A record** pointing your domain to your EC2 instance's public IP address.
4. It may take a few minutes for DNS changes to propagate.

---

### 7. **Ensure Security Best Practices**

- **SSH Access**: Consider limiting SSH access by only allowing your IP address in the security group for SSH (port 22).
- **Regular Updates**: Regularly update your EC2 instance to ensure it’s secure.
  
---

### Conclusion

By following these steps, you’ve successfully:

1. **Provisioned** an EC2 instance.
2. **Installed** the Apache web server.
3. **Deployed** your HTML page and assets to the server.
4. **Configured networking** and security to allow access to your website.

You now have a running web server on AWS EC2 serving your HTML page. Let me know if you need help with any additional steps or have further questions!
