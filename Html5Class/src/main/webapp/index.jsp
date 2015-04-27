<html>
<body>
<h2>Hello World!</h2>
<label>Homepage: <input name="hp" type="url" list="hpurls"/></label>
<datalist id="hpurls">
	<option value="http://www.pchome.com.tw" label="Pchome" />
	<option value="http://www.google.com" label="Google" />
	<option value="http://www.facebook.com" label="Facebook" />
</datalist>
<form action="">
	<input type="file" name="file1" multiple/> <br/>
	<input type="color" name="color1" multiple/> <br/>
	<span id="span1" ></span>
	<input type="range" name="range1" step="5" min="0" max="100"/> <br/>
	<script type="text/javascript">
		var theRange = document.querySelector("input[name=range1]");
		var span1 = document.querySelector("span");
		theRange.addEventListener("change", function() {
			span1.innerText = theRange.value;
		});
	</script>
</form>

</body>
</html>
