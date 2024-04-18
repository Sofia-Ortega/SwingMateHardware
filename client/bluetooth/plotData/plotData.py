
import matplotlib.pyplot as plt
# import data.testNotifyData2 as myData
import data.testReadData2 as myData

data = myData.data

t = []
x = []
y = []
z = []


for i, dat in enumerate(data):
  t.append(i)
  x.append(dat[1])
  y.append(dat[2])
  z.append(dat[3])

plt.plot(t, x, marker='o', linestyle='-')
plt.show()

plt.plot(t, y, marker='o', linestyle='-')
plt.show()

plt.plot(t, z, marker='o', linestyle='-')
plt.show()
