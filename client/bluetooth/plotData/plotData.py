
import matplotlib.pyplot as plt
import data.myData3 as myData


data = myData.data

t = []
x = []
y = []
z = []

for i, dat in enumerate(data):
  t.append(i)
  x.append(dat[0])
  y.append(dat[1])
  z.append(dat[2])

plt.plot(t, x, marker='o', linestyle='-')
plt.show()

plt.plot(t, y, marker='o', linestyle='-')
plt.show()

plt.plot(t, z, marker='o', linestyle='-')
plt.show()




