import urllib, json

countries = [
    "USA",
    "ALBANIA",
    "ALGERIA",
    "ANGOLA",
    "ARGENTINA",
    "ARMENIA",
    "AUSTRALI",
    "AUSTRIA",
    "BAHRAIN",
    "BANGLADESH",
    "BELARUS",
    "BELGIUM",
    "BENIN",
    "BOLIVIA",
    "BOSNIAHERZ",
    "BOTSWANA",
    "BRAZIL",
    "BRUNEI",
    "BULGARIA",
    "CAMBODIA",
    "CAMEROON",
    "CANADA",
    "CHILE",
    "CHINAREG",
    "COLOMBIA",
    "CONGO",
    "COSTARICA",
    "COTEIVOIRE",
    "CROATIA",
    "CUBA",
    "CYPRUS",
    "CZECH",
    "DENMARK",
    "DOMINICANR",
    "ECUADOR",
    "EGYPT",
    "ELSALVADOR",
    "EQGUINEA",
    "ERITREA",
    "ESTONIA",
    "ETHIOPIA",
    "FINLAND",
    "FRANCE",
    "GABON",
    "GEORGIA",
    "GERMANY",
    "GHANA",
    "GIBRALTAR",
    "GREECE",
    "GUATEMALA",
    "HAITI",
    "HONDURAS",
    "HONGKONG",
    "HUNGARY",
    "ICELAND",
    "INDIA",
    "INDONESIA",
    "IRAQ",
    "IRELAND",
    "ISRAEL",
    "ITALY",
    "JAMAICA",
    "JAPAN",
    "JORDAN",
    "KAZAKHSTAN",
    "KENYA",
    "KOREA",
    "KUWAIT",
    "KYRGYZSTAN",
    "LATVIA",
    "LEBANON",
    "LIBYA",
    "LITHUANIA",
    "LUXEMBOU",
    "MALAYSIA",
    "MALTA",
    "MAURITIUS",
    "MEXICO",
    "MOLDOVA",
    "MONGOLIA",
    "MOROCCO",
    "MOZAMBIQUE",
    "MYANMAR",
    "NAMIBIA",
    "NEPAL",
    "NETHLAND",
    "NZ",
    "NICARAGUA",
    "NIGER",
    "NIGERIA",
    "NORTHMACED",
    "NORWAY",
    "OMAN",
    "PAKISTAN",
    "PANAMA",
    "PARAGUAY",
    "PERU",
    "PHILIPPINE",
    "POLAND",
    "PORTUGAL",
    "QATAR",
    "ROMANIA",
    "RUSSIA",
    "MRWANDA",
    "SAUDIARABI",
    "SENEGAL",
    "SINGAPORE",
    "SLOVAKIA",
    "SLOVENIA",
    "SOUTHAFRIC",
    "SPAIN",
    "SRILANKA",
    "SUDAN",
    "SURINAME",
    "SWEDEN",
    "SWITLAND",
    "SYRIA",
    "TAIPEI",
    "TAJIKISTAN",
    "TANZANIA",
    "THAILAND",
    "TOGO",
    "TRINIDAD",
    "TUNISIA",
    "TURKEY",
    "TURKMENIST",
    "MUGANDA",
    "UKRAINE",
    "UAE",
    "UK",
    "URUGUAY",
    "UZBEKISTAN",
    "VENEZUELA",
    "VIETNAM",
    "YEMEN",
    "ZAMBIA",
    "ZIMBABWE"
]

# scaping Yotal final consumption data from IEA
def TFC_By_Sector_IEA(country, year):
    print "Preparing Total Final Consumption (TFC) by sector for " + country
    data = "https://api.iea.org/stats/indicator/TFCShareBySector?countries=" + country + "&startYear=" + str(year)
    # data = "https://api.iea.org/stats/indicator/TFCShareBySector?countries=USA&startYear=1990"
    response = urllib.urlopen(data)
    TFC = json.loads(response.read())
    sum = 0
    years = []
    output = {}
    output["transport"] = 0
    output["industry"] = 0
    output["residential"] = 0
    output["commercial"] = 0
    output["agriculture"] = 0
    output["nonEnergy"] = 0
    output["nonSpecified"] = 0
    output["avg"] = 0
    # print len(TFC)
    for x in range(len(TFC)):
        if(not TFC[x]["value"] == None):
            if(TFC[x]["flowLabel"] == "Transport"):
                output["transport"] += TFC[x]["value"]
            if(TFC[x]["flowLabel"] == "Industry"):
                output["industry"] += TFC[x]["value"]
            if(TFC[x]["flowLabel"] == "Residential"):
                output["residential"] += TFC[x]["value"]
            if(TFC[x]["flowLabel"] == "Commercial and public services"):
                output["commercial"] += TFC[x]["value"]
            if(TFC[x]["flowLabel"] == "Agriculture / forestry"):
                output["agriculture"] += TFC[x]["value"]
            if(TFC[x]["flowLabel"] == "Non-energy use"):
                output["nonEnergy"] += TFC[x]["value"]
            if(TFC[x]["flowLabel"] == "Non-specified"):
                output["nonSpecified"] += TFC[x]["value"]
            # sum += TFC[x]["value"]
            if(TFC[x]["year"] not in years):
                years.append(TFC[x]["year"])

    if(len(years) == 0):
        return []

    output["transport"] /= len(years)
    output["industry"] /= len(years)
    output["residential"] /= len(years)
    output["commercial"] /= len(years)
    output["agriculture"] /= len(years)
    output["nonEnergy"] /= len(years)
    output["nonSpecified"] /= len(years)
    output["avg"] = output["transport"] + output["industry"] + output["residential"]+ output["commercial"] + output["agriculture"] + output["nonEnergy"] + output["nonSpecified"]
    # print average
    return output

# scrape CO2 emission data from IEA
def CO2_per_capita(country, year):
    print "Preparing Carbon Emission per capita for " + country
    data = "https://api.iea.org/stats/indicator/CO2PerCap?countries="+ country + "&startYear=" + str(year)
    # data = "https://api.iea.org/stats/indicator/CO2PerCap?countries=LITHUANIA&startYear=1990"
    response = urllib.urlopen(data)
    CO2 = json.loads(response.read())
    sum = 0
    years = []
    
    for x in range(len(CO2)):
        if(not CO2[x]["value"] == None):
            sum += CO2[x]["value"]
            if(CO2[x]["year"] not in years):
                years.append(CO2[x]["year"])

    if(len(years) == 0):
        return 0
    average =  sum / len(years)
    # print average
    return average

# scrape renewable waste final consumption data from IEA
def Renewable_waste_final_comsumption(country , year):
    print "Preparing Renewable and waste final energy consumption for " + country
    data = "https://api.iea.org/stats/indicator/SDG72?countries=" + country + "&startYear=" + str(year)
    # data = "https://api.iea.org/stats/indicator/SDG72?countries=LITHUANIA&startYear=1990"
    response = urllib.urlopen(data)
    REN = json.loads(response.read())
    sum = 0
    years = []
    for x in range(len(REN)):
        if(not REN[x]["value"] == None):
            sum += REN[x]["value"]
            if(REN[x]["year"] not in years):
                years.append(REN[x]["year"])

    if(len(years) == 0):
        return 0
    average =  sum / len(years)
    # print average
    return average

# putting data into different categories for total final consumption
# calculate upper and lower boundary of the range based on the highest value and lowest value of the data
def callTFC():
    with open('countries.geojson', 'r') as myfile:
        data=myfile.read()

    obj = json.loads(data)

    data_dict = {}
    l = -1
    h = -1
    sum = 0
    count = 0

    for x in countries:
        try:
            val = TFC_By_Sector_IEA(x, 1990)
            if(len(val) == 0):
                continue
            h = max(h, val['avg'])
            if(l == -1):
                l = val['avg']
            l = min(l, val['avg'])
            print x + " : " + str(val['avg'])
            data_dict[x] = val
            sum += val['avg']
            count += 1
        except ValueError:
            continue

    avg = sum / count

    print h
    print l
    print avg

    for x in range(len(obj["features"])):
        country = obj["features"][x]["properties"]["ADMIN"]
        obj["features"][x]["properties"]["val"] = -1
        try:
            if(data_dict[country]):
                curr = data_dict[country]
                val = curr['avg']
                obj["features"][x]["properties"]["val"] = val
                obj["features"][x]["properties"]["transport"] = curr["transport"]
                obj["features"][x]["properties"]["industry"] = curr["industry"]
                obj["features"][x]["properties"]["residential"] = curr["residential"]
                obj["features"][x]["properties"]["commercial"] = curr["commercial"]
                obj["features"][x]["properties"]["agriculture"] = curr["agriculture"]
                obj["features"][x]["properties"]["nonEnergy"] = curr["nonEnergy"]
                obj["features"][x]["properties"]["nonSpecified"] = curr["nonSpecified"]
                if(val > avg + (h - avg) * 2 / 3):
                    obj["features"][x]["properties"]["ID"] = 1
                elif(val > avg + (h - avg) / 3):
                    obj["features"][x]["properties"]["ID"] = 2
                elif(val > avg):
                    obj["features"][x]["properties"]["ID"] = 3
                elif(val > (avg - l) / 2):
                    obj["features"][x]["properties"]["ID"] = 4
                else:
                    obj["features"][x]["properties"]["ID"] = 5
                    
        except KeyError:
            continue

    with open('TFC.geojson', 'w') as outfile:
        json.dump(obj, outfile)

# putting data into different categories for CO2 emission
# calculate upper and lower boundary of the range based on the highest value and lowest value of the data
def callCO2():
    with open('countries.geojson', 'r') as myfile:
        data=myfile.read()

    obj = json.loads(data)

    data_dict = {}
    l = -1
    h = -1
    sum = 0
    count = 0

    for x in countries:
        try:
            val = CO2_per_capita(x, 1990)
            if(val == 0):
                continue
            h = max(h, val)
            if(l == -1):
                l = val
            l = min(l, val)
            print x + " : " + str(val)
            data_dict[x] = val
            sum += val
            count += 1
        except ValueError:
            continue

    avg = sum / count

    print h
    print l
    print avg

    for x in range(len(obj["features"])):
        country = obj["features"][x]["properties"]["ADMIN"]
        obj["features"][x]["properties"]["val"] = -1
        try:
            if(data_dict[country]):
                val = data_dict[country]
                obj["features"][x]["properties"]["val"] = val
                if(val > avg + (h - avg) * 2 / 3):
                    obj["features"][x]["properties"]["ID"] = 1
                elif(val > avg + (h - avg) / 3):
                    obj["features"][x]["properties"]["ID"] = 2
                elif(val > avg):
                    obj["features"][x]["properties"]["ID"] = 3
                    
                elif(val > (avg - l) / 2):
                    obj["features"][x]["properties"]["ID"] = 4
                    
                else:
                    obj["features"][x]["properties"]["ID"] = 5
                    
        except KeyError:
            continue

    with open('CO2.geojson', 'w') as outfile:
        json.dump(obj, outfile)

# putting data into different categories for renewable energy
# calculate upper and lower boundary of the range based on the highest value and lowest value of the data
def callRenewable():
    with open('countries.geojson', 'r') as myfile:
        data=myfile.read()

    obj = json.loads(data)

    data_dict = {}
    l = -1
    h = -1
    sum = 0
    count = 0

    for x in countries:
        try:
            val = Renewable_waste_final_comsumption(x, 1990)
            if(val == 0):
                continue
            h = max(h, val)
            if(l == -1):
                l = val
            l = min(l, val)
            print x + " : " + str(val)
            data_dict[x] = val
            sum += val
            count += 1
        except ValueError:
            continue

    avg = sum / count

    print h
    print l
    print avg

    for x in range(len(obj["features"])):
        country = obj["features"][x]["properties"]["ADMIN"]
        obj["features"][x]["properties"]["val"] = -1
        try:
            if(data_dict[country]):
                val = data_dict[country]
                obj["features"][x]["properties"]["val"] = val
                if(val > avg + (h - avg) * 2 / 3):
                    obj["features"][x]["properties"]["ID"] = 1
                elif(val > avg + (h - avg) / 3):
                    obj["features"][x]["properties"]["ID"] = 2
                elif(val > avg):
                    obj["features"][x]["properties"]["ID"] = 3
                    
                elif(val > (avg - l) / 2):
                    obj["features"][x]["properties"]["ID"] = 4
                    
                else:
                    obj["features"][x]["properties"]["ID"] = 5
                    
        except KeyError:
            continue

    with open('renewable.geojson', 'w') as outfile:
        json.dump(obj, outfile)

callTFC()
# callCO2()
callRenewable()