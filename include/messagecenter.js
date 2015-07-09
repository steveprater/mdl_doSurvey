$(document).ready(function(){
	checkGmailSetup();
	checkSurveySetup();
});

function checkSurveySetup(){
	var sessionid = getCookie("MoodleSession");
	$.get('/moodle/wosc/dosurvey.php', { session: sessionid} )
		.done(function(data) {
			if (data != "0"){
				$("#surveydestination").attr("href","https://census.wosc.edu/index.php/survey/index/sid/816215/newtest/Y/lang/en/816215X16X295/" + data + "/");
				$("#surveydestinationx").attr("href","https://census.wosc.edu/index.php/survey/index/sid/816215/newtest/Y/lang/en/816215X16X295/" + data + "/");
				$("#woscnotice").css("display", "block");
			}
		});
}

function checkGmailSetup(){

        var sessionid = getCookie('MoodleSession');
        $.ajax({
                url:"/moodle/wosc/checkgmail.php",
                data: {'MoodleSession': sessionid },
                success: function(data){
						//alert(data);
                       processGmailResponse(data);
                },
                type: 'GET'
        });
}

function authorizeMoodle(){
        window.location.href = 'http://stevedev.wosc.edu/moodle/wosc/checkgmail.php?action=getToken';
}

function processGmailResponse(data){

        if(data == "0"){
                var html = '<p style="font-weight:bold"> You have not authorized Moodle to access your email yet. <button type="button" id="authorize" onClick="authorizeMoodle()">Authorize</button></p>';
                $('#gmailStatus').html(html);
                $("#gmailStatus").css("display", "block");
        }
        else {
			if(data != "null"){
                $('#gmailStatus').html(data);
                $("#gmailStatus").css("display", "block");
		$(".userpicture").addClass('bell');
		$(".avatar").addClass('displaybadge');
		$(".userpicture").attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKOWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAEjHnZZ3VFTXFofPvXd6oc0wAlKG3rvAANJ7k15FYZgZYCgDDjM0sSGiAhFFRJoiSFDEgNFQJFZEsRAUVLAHJAgoMRhFVCxvRtaLrqy89/Ly++Osb+2z97n77L3PWhcAkqcvl5cGSwGQyhPwgzyc6RGRUXTsAIABHmCAKQBMVka6X7B7CBDJy82FniFyAl8EAfB6WLwCcNPQM4BOB/+fpFnpfIHomAARm7M5GSwRF4g4JUuQLrbPipgalyxmGCVmvihBEcuJOWGRDT77LLKjmNmpPLaIxTmns1PZYu4V8bZMIUfEiK+ICzO5nCwR3xKxRoowlSviN+LYVA4zAwAUSWwXcFiJIjYRMYkfEuQi4uUA4EgJX3HcVyzgZAvEl3JJS8/hcxMSBXQdli7d1NqaQffkZKVwBALDACYrmcln013SUtOZvBwAFu/8WTLi2tJFRbY0tba0NDQzMv2qUP91829K3NtFehn4uWcQrf+L7a/80hoAYMyJarPziy2uCoDOLQDI3fti0zgAgKSobx3Xv7oPTTwviQJBuo2xcVZWlhGXwzISF/QP/U+Hv6GvvmckPu6P8tBdOfFMYYqALq4bKy0lTcinZ6QzWRy64Z+H+B8H/nUeBkGceA6fwxNFhImmjMtLELWbx+YKuGk8Opf3n5r4D8P+pMW5FonS+BFQY4yA1HUqQH7tBygKESDR+8Vd/6NvvvgwIH554SqTi3P/7zf9Z8Gl4iWDm/A5ziUohM4S8jMX98TPEqABAUgCKpAHykAd6ABDYAasgC1wBG7AG/iDEBAJVgMWSASpgA+yQB7YBApBMdgJ9oBqUAcaQTNoBcdBJzgFzoNL4Bq4AW6D+2AUTIBnYBa8BgsQBGEhMkSB5CEVSBPSh8wgBmQPuUG+UBAUCcVCCRAPEkJ50GaoGCqDqqF6qBn6HjoJnYeuQIPQXWgMmoZ+h97BCEyCqbASrAUbwwzYCfaBQ+BVcAK8Bs6FC+AdcCXcAB+FO+Dz8DX4NjwKP4PnEIAQERqiihgiDMQF8UeikHiEj6xHipAKpAFpRbqRPuQmMorMIG9RGBQFRUcZomxRnqhQFAu1BrUeVYKqRh1GdaB6UTdRY6hZ1Ec0Ga2I1kfboL3QEegEdBa6EF2BbkK3oy+ib6Mn0K8xGAwNo42xwnhiIjFJmLWYEsw+TBvmHGYQM46Zw2Kx8lh9rB3WH8vECrCF2CrsUexZ7BB2AvsGR8Sp4Mxw7rgoHA+Xj6vAHcGdwQ3hJnELeCm8Jt4G749n43PwpfhGfDf+On4Cv0CQJmgT7AghhCTCJkIloZVwkfCA8JJIJKoRrYmBRC5xI7GSeIx4mThGfEuSIemRXEjRJCFpB+kQ6RzpLuklmUzWIjuSo8gC8g5yM/kC+RH5jQRFwkjCS4ItsUGiRqJDYkjiuSReUlPSSXK1ZK5kheQJyeuSM1J4KS0pFymm1HqpGqmTUiNSc9IUaVNpf+lU6RLpI9JXpKdksDJaMm4ybJkCmYMyF2TGKQhFneJCYVE2UxopFykTVAxVm+pFTaIWU7+jDlBnZWVkl8mGyWbL1sielh2lITQtmhcthVZKO04bpr1borTEaQlnyfYlrUuGlszLLZVzlOPIFcm1yd2WeydPl3eTT5bfJd8p/1ABpaCnEKiQpbBf4aLCzFLqUtulrKVFS48vvacIK+opBimuVTyo2K84p6Ss5KGUrlSldEFpRpmm7KicpFyufEZ5WoWiYq/CVSlXOavylC5Ld6Kn0CvpvfRZVUVVT1Whar3qgOqCmrZaqFq+WpvaQ3WCOkM9Xr1cvUd9VkNFw08jT6NF454mXpOhmai5V7NPc15LWytca6tWp9aUtpy2l3audov2Ax2yjoPOGp0GnVu6GF2GbrLuPt0berCehV6iXo3edX1Y31Kfq79Pf9AAbWBtwDNoMBgxJBk6GWYathiOGdGMfI3yjTqNnhtrGEcZ7zLuM/5oYmGSYtJoct9UxtTbNN+02/R3Mz0zllmN2S1zsrm7+QbzLvMXy/SXcZbtX3bHgmLhZ7HVosfig6WVJd+y1XLaSsMq1qrWaoRBZQQwShiXrdHWztYbrE9Zv7WxtBHYHLf5zdbQNtn2iO3Ucu3lnOWNy8ft1OyYdvV2o/Z0+1j7A/ajDqoOTIcGh8eO6o5sxybHSSddpySno07PnU2c+c7tzvMuNi7rXM65Iq4erkWuA24ybqFu1W6P3NXcE9xb3Gc9LDzWepzzRHv6eO7yHPFS8mJ5NXvNelt5r/Pu9SH5BPtU+zz21fPl+3b7wX7efrv9HqzQXMFb0ekP/L38d/s/DNAOWBPwYyAmMCCwJvBJkGlQXlBfMCU4JvhI8OsQ55DSkPuhOqHC0J4wybDosOaw+XDX8LLw0QjjiHUR1yIVIrmRXVHYqLCopqi5lW4r96yciLaILoweXqW9KnvVldUKq1NWn46RjGHGnIhFx4bHHol9z/RnNjDn4rziauNmWS6svaxnbEd2OXuaY8cp40zG28WXxU8l2CXsTphOdEisSJzhunCruS+SPJPqkuaT/ZMPJX9KCU9pS8Wlxqae5Mnwknm9acpp2WmD6frphemja2zW7Fkzy/fhN2VAGasyugRU0c9Uv1BHuEU4lmmfWZP5Jiss60S2dDYvuz9HL2d7zmSue+63a1FrWWt78lTzNuWNrXNaV78eWh+3vmeD+oaCDRMbPTYe3kTYlLzpp3yT/LL8V5vDN3cXKBVsLBjf4rGlpVCikF84stV2a9021DbutoHt5turtn8sYhddLTYprih+X8IqufqN6TeV33zaEb9joNSydP9OzE7ezuFdDrsOl0mX5ZaN7/bb3VFOLy8qf7UnZs+VimUVdXsJe4V7Ryt9K7uqNKp2Vr2vTqy+XeNc01arWLu9dn4fe9/Qfsf9rXVKdcV17w5wD9yp96jvaNBqqDiIOZh58EljWGPft4xvm5sUmoqbPhziHRo9HHS4t9mqufmI4pHSFrhF2DJ9NProje9cv+tqNWytb6O1FR8Dx4THnn4f+/3wcZ/jPScYJ1p/0Pyhtp3SXtQBdeR0zHYmdo52RXYNnvQ+2dNt293+o9GPh06pnqo5LXu69AzhTMGZT2dzz86dSz83cz7h/HhPTM/9CxEXbvUG9g5c9Ll4+ZL7pQt9Tn1nL9tdPnXF5srJq4yrndcsr3X0W/S3/2TxU/uA5UDHdavrXTesb3QPLh88M+QwdP6m681Lt7xuXbu94vbgcOjwnZHokdE77DtTd1PuvriXeW/h/sYH6AdFD6UeVjxSfNTws+7PbaOWo6fHXMf6Hwc/vj/OGn/2S8Yv7ycKnpCfVEyqTDZPmU2dmnafvvF05dOJZ+nPFmYKf5X+tfa5zvMffnP8rX82YnbiBf/Fp99LXsq/PPRq2aueuYC5R69TXy/MF72Rf3P4LeNt37vwd5MLWe+x7ys/6H7o/ujz8cGn1E+f/gUDmPP8usTo0wAAAAlwSFlzAAALEgAACxIB0t1+/AAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC41ZYUyZQAABPhJREFUWEe9WHtMU1cYL7RQaHkIKpT3Q14tMUWUSHhMZk2cf2LMgkb0D7IlYwk4NSzZsnTZwmAjRUFGJOGPmixKMHELOrIH0NdtS58oFBVmKCCVYXmO56W23Xe7OwJyCgIXfskvN/fc79VzvvOd85W2E+hPnMjBwsKU8gMHJrHIyHbdyZPp5Ke9RffZs/FSH58FZXj4L1hExEcKDqdNymZPmi5f5pAiewNHfz9Tm5ZWKQsImDQKBMXa9PQrBoHgM6mv77w2M/MLp8nkTYruDpxOp8fjc+fiOrncShmbPdJBp7/pgOF1pNNtMn//Ic3hw18bCgrCSXXqMCwS+XYmJ1dIvL3nkQG4oYTJnNEcOfK5SSikZqZMRUXBWHg4hnL2rlRFRT16fO0amzS5PVgaGliQmCqUg61SFR39245ySZWQUIUyvF1qeLyvSNNbw0BxcYyEwVhGGd0uIYeWzNevb33rq7hcEcrgTqlOSdna7BDZrwgO7kMZ2ykVBw9qnTSaB+lqc5iLizlQL+woYzsllAfcKZH4kK42hyk//wOUIar4V1lZFulqc2CxsWUoI1QRi4r6hHS1OTSpqfdRRqhiJ4/3I+lqYxBnkMzX14gyQhXl+/a1ku42hqmuzk/u7/8KZYQqKoKCepubm+mkS/fQZGRwIOMpLXZvE+49cyYeb/OjoefChfdRBqjmYFUVj3TpHqr4+CsoZaqpS0srIl26hzox8XeUMtVUx8ffIV2iMV5TEwCH2ThKmWpK/fyeQyVmkK7XA277me0eHg6UMuVkMGy9cDMgXa8HLNENpOIusTMlRUi6Xot+oTBAxmLtyRL9Tyh+z5D3Yw2f/yFKYVfp6WnvEgjyyBD+g76hwUsRGtqLVNhlgl85HEGeZCgQTEZGfse7JC6d7oDqbIdm7Y2UxVp2kc3GYXmXiOfKGHwn5Ah5pJ3VhD7ryenTua5A+ltbmfKgoP41Ap6eDmVs7JwhO3vgaWGhBqrlH6/E4ibrw4eNM1rt7QWz+dbCixeNMzrdvSmlsmlKKm2aUqmaiHdifGFg4NaMRnPb2tLSaBGLmwcrK/80nT+v02dnD2LR0fNv/3DF/v0G1zYnOkRiQBYYiD85c6ZnpL7+Pm613nQ4HN9sxL6SEmQvBRcnOUp+NfGxsZqh6uqfoTV+Dt2pjSgnOj7/SxoUOVwVFzcJAVSjFN1xCsMaoPFf0+LCUi3D7NSj5N0RZrlWERIyBzeFWRrxVwYxbfqsrMFRmFKIWoRSQpGQV8bETMIy43Cmjf999+49lByKi8PDN2AVHmiPHrUQ/iEtWlz1RRkXJ5Z6e8/CoOvXafn8sd7CQq25ouLRRHu7+J+urppFi0VkX1ysdNjt5auN2nG8HH/9+ge7zbYybrfbv4X372yzs98vvnwpmjEaayfa2u4MlJf/arp4UQ83PSskus01m0zmtCoxsc4iFLJcSUyg79KlCO3x46XETMFOmIAGDl9JNAbDAQUKJ6YTCw2dhpZ3XJ2aOqo7dmzEkJs7ZDx1ymzIyRnWwruayx0lvmMczjTIz0MuLq/sKrBH2IXltSojI1tB5+PugoJQMgQ0iJ74WWlpsvrQoTxjXl6JOiGhFrbrXSwkRKIIC+uB3mcQnEwQ/8dA4EsSLy+ceML7nDwwcBy+m0GuG57tMPZTZ1LSza68vE9hKd57evVqklOv9yJdrQKN9i/nHc+u9Sz7pgAAAABJRU5ErkJggg==');
			}
        }
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}



