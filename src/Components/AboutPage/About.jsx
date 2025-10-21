import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">About</h2>

      <div className="text-center mb-4">
        <img
          src="https://prasadyash2411.github.io/ecom-website/img/Band%20Members.png"
          alt="band"
          className="img-fluid rounded shadow-sm"
          style={{ maxWidth: "300px" }}
        />
      </div>

      <p className="lead text-muted">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nam magni
        tenetur cupiditate iusto, laboriosam, reiciendis totam rem omnis
        voluptas perspiciatis placeat aliquam, minima odio voluptatibus
        veritatis et sapiente asperiores! Eos, voluptatem recusandae ex
        doloremque porro natus nostrum...
      </p>

      <p>
        Obcaecati voluptates excepturi perspiciatis commodi numquam accusantium
        dolore tempora? Dolor minus consequatur odio eaque, laudantium, ipsa,
        excepturi doloremque in beatae vel ut ab sit. Quae hic eveniet quam eius
        eum odit quaerat magnam?
      </p>

      <p>
        Esse culpa similique rem ipsa nobis laborum. Quo asperiores repudiandae
        aliquam minima consequuntur facilis et repellat quis animi soluta
        reiciendis corrupti ipsam eius vitae distinctio, reprehenderit provident
        eveniet quod.
      </p>
    </div>
  );
};

export default About;
