import kuva from '../images/kytkenta.jpg'

const Ohjeet = () => {
    return (
      <div>
      <h1>1. Projektin alustaminen</h1>
      <p>Koneelle on asennettu seuraavat työkalut/ohjelmat:</p>
      <ul>
        <li>Python3</li>
        <li><a href="https://pypi.org/project/pip/">pip</a><ul><li> "pip is the package installer for Python. You can use pip to install packages from the <a href="https://pypi.org/"> Python Package Index </a> and other indexes"</li></ul></li>
        <li><a href="https://docs.python.org/3/library/venv.html">Virtual environment tai venv</a><ul><li>pipillä asennettu paketti</li><li>Voidaan käyttää esim. riippuvuuksien hallintaan</li></ul></li>
        <li>Visual studio code<ul><li>Koodieditori</li><li>Voidaan kutsua komentotulkilta nimellä code</li></ul></li>
      </ul>
      <p>Näiden työkalujen avulla perustamme projektin tämän päivän työpajaa varten. </p>
      <h3>Kansiorakenne:</h3>
      <pre>        Projekti-kansio
      <br/>          |
      <br/>          |__venvi-kansio
      <br/>          |    |
      <br/>          |    |__bin
      <br/>          |    |   |
      <br/>          |    |   |__activate
      <br/>          |    |   |
      <br/>          |    |   |...
      <br/>          |    |
      <br/>          |    |...
      <br/>          |
      <br/>          |__mittari.py
      <br/>          |
      <br/>          |__lampotilapalvelu.py</pre>
  
      <h1>2. Mittarin asentaminen</h1>
      <h3>Virallinen sivu: <a href='https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/python-setup' >adafruit dht11</a></h3>
      <h3>Kytkentäkaavio:</h3>
      <img width="800px" src={kuva} alt="Kuva kytkennästä"/>
      
      <h3>Ohjelmakoodi:</h3>
      <div className="python-koodi">
        import time<br/>
        import board<br/>
        import adafruit_dht<br/>
        <br/>
        dhtDevice = adafruit_dht.DHT11(board.D18)<span className="comment">  # Alustetaan dht anturi joka on kytketty d18 porttiin</span>
        <br/>
        <br/>
        while True:
        <br/>    try:
        <br/>        temperature = dhtDevice.temperature<span className="comment">  # Tulostetaan tiedot konsoliin</span>
        <br/>        print(f"Temp: {'{temperature}'}")<span className="comment">  # f-stringi voi ottaa sisäänsä muuttujan</span>
        <br/>
        <br/>    except RuntimeError as error:<span className="comment">  # Koska dht anturit ovat virheherkkiä niin ohjelma jatkaa toimimista pienistä virheistä huolimatta</span>
        <br/>        print(error.args[0])  <span className="comment">  # Tulostetaan virheilmoitus</span>
        <br/>        time.sleep(2.0)  <span className="comment">  # Odotetaan hetki</span>
        <br/>        continue  <span className="comment">  # Jatketaan looppia</span>
        <br/>
        <br/>    except Exception as error:  <span className="comment">  # Exception tason error tarkoittaa että jotain on oikeasti pielessä, joten ohjelma suljetaan</span>
        <br/>        dhtDevice.exit()  <span className="comment">  # Irroitetaan dht-anturi</span>
        <br/>        raise error  <span className="comment">  # Error viesti</span>
        <br/>
        <br/>    time.sleep(2.0)  <span className="comment">  # Odotetaan hetki</span>
      </div>
  
  
      <h1>3. <a href='https://docs.python-requests.org/en/latest/' >Python requests</a></h1>
      <p>"Requests is an elegant and simple HTTP library for Python"</p>
      <a href="https://docs.python-requests.org/en/latest/user/quickstart/#">Python requestin quickstart</a>
      <br/><br/><br/>
      <div className="python-koodi">Get polkuja:<br/>/api/temperatures<br/>/api/latestbyid<br/><br/>
      
      Post polku:
      <br/>
      /api/posttemperature
      <br/><br/>
      Lähetettävän datan tulee olla muotoa:
      
      <br/><br/>
      <pre>{'{'}</pre>
      <pre>   "temp": float,</pre>
      <pre>   "apikey": string,</pre>
      <pre>   "deviceId": int</pre>
      <pre>{'}'}</pre>
      <br/><br/>
  
      Datan pitää olla jsonia.
      <br/><br/>
      </div>
      <h3>Datan lähettäminen palvelimelle:</h3>
      <a href="https://docs.python-requests.org/en/latest/user/quickstart/#more-complicated-post-requests">Json muotoisen datan lähetys</a>
      <h3>Datan hakeminen palvelimelta:</h3>
      <a href="https://docs.python-requests.org/en/latest/user/quickstart/#json-response-content">Json muotoisen datan hakeminen</a>
    </div>
    )
  }

  export default Ohjeet