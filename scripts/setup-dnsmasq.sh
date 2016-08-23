apt-get update
apt-get install dnsmasq httping
echo "address=/bosh-lite.com/${CF_IP}" | tee -a /etc/dnsmasq.conf > /dev/null
dpkg-reconfigure resolvconf
/etc/init.d/dnsmasq restart
