import unittest

from hello import my_adder

# 使用 python -m unittest 运行用例
# 继承 unittest.TestCase
class TestHello(unittest.TestCase):
  # 会在每一个 test_执行前执行 可以用来创建公共对象
  def setUp(self) -> None:
      self.a = 1
      return super().setUp()
  # 必须以 test_开头
  def test_my_adder(self):
        print(self.a)
        self.assertEqual(my_adder(1, 2), 3)
        self.assertTrue(my_adder(1, 2) == 3)
        self.assertFalse(my_adder(1, 2) == 4)
        self.assertIn(self.a, [1, 2, 3])
        self.assertNotIn(4, [1, 2, 3])